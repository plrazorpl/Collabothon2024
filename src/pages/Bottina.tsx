import React, { useEffect, useRef, useCallback, useState } from 'react';
import { RealtimeClient } from '../lib/realtime-api-beta/index.js';
import { ItemType } from '../lib/realtime-api-beta/dist/lib/client.js';
import { WavRecorder, WavStreamPlayer } from '../lib/wavtools/index.js';
import { instructions } from '../utils/conversation_config.js';
import { WavRenderer } from '../utils/wav_renderer';
import { X, Edit } from 'react-feather';
import { CustomButton } from '../components/button/Button';
import './Bottina.scss';
import { SimliClient } from 'simli-client';
import Grid from "@mui/material/Grid";
import MicIcon from "@mui/icons-material/Mic";
import Button from '@mui/material/Button';
import '../widgetConcept/widget.css';

/**
 * Change this if you want to connect to a local relay server!
 * This will require you to set OPENAI_API_KEY= in a .env file
 * You can run it with npm run relay, in parallel with npm start
 *
 * Simply switch the lines by commenting one and removing the other
 */
// const USE_LOCAL_RELAY_SERVER_URL: string | undefined = 'http://localhost:8081';
const USE_LOCAL_RELAY_SERVER_URL: string | undefined = undefined;

/**
 * Type for all event logs
 */
interface RealtimeEvent {
  time: string;
  source: 'client' | 'server';
  count?: number;
  event: { [key: string]: any };
}

function resampleAudioData(
  inputData: Int16Array,
  inputSampleRate: number,
  outputSampleRate: number
): Int16Array {
  const sampleRateRatio = inputSampleRate / outputSampleRate;
  const outputLength = Math.round(inputData.length / sampleRateRatio);
  const outputData = new Int16Array(outputLength);

  for (let i = 0; i < outputLength; i++) {
    const sourceIndex = i * sampleRateRatio;
    const lowerIndex = Math.floor(sourceIndex);
    const upperIndex = Math.min(lowerIndex + 1, inputData.length - 1);
    const interpolation = sourceIndex - lowerIndex;
    outputData[i] =
      (1 - interpolation) * inputData[lowerIndex] +
      interpolation * inputData[upperIndex];
  }

  return outputData;
}

export function Bottina() {
  /**
   * Check if required .env variables exist
   */
  const missingEnvVars = [];
  if (!process.env.REACT_APP_NEWS_API_KEY) {
    missingEnvVars.push('REACT_APP_NEWS_API_KEY');
  }
  if (!process.env.REACT_APP_SIMLI_API_KEY) {
    missingEnvVars.push('REACT_APP_SIMLI_API_KEY');
  }
  if (!process.env.REACT_APP_SIMLI_FACE_ID) {
    missingEnvVars.push('REACT_APP_SIMLI_FACE_ID');
  }

  if (missingEnvVars.length > 0) {
    return (
      <div>
        <p>Please create a .env file</p>
      </div>
    );
  }

  /**
   * Ask user for API Key
   * If we're using the local relay server, we don't need this
   */
  const apiKey = USE_LOCAL_RELAY_SERVER_URL
    ? ''
    : localStorage.getItem('tmp::voice_api_key') ||
      prompt('OpenAI API Key') ||
      '';
  if (apiKey !== '') {
    localStorage.setItem('tmp::voice_api_key', apiKey);
  }

  /**
   * Instantiate:
   * - WavRecorder (speech input)
   * - WavStreamPlayer (speech output)
   * - RealtimeClient (API client)
   */
  const wavRecorderRef = useRef<WavRecorder>(
    new WavRecorder({ sampleRate: 24000 })
  );
  const wavStreamPlayerRef = useRef<WavStreamPlayer>(
    new WavStreamPlayer({ sampleRate: 24000 })
  );
  const clientRef = useRef<RealtimeClient>(
    new RealtimeClient(
      USE_LOCAL_RELAY_SERVER_URL
        ? { url: USE_LOCAL_RELAY_SERVER_URL }
        : {
            apiKey: apiKey,
            dangerouslyAllowAPIKeyInBrowser: true,
          }
    )
  );

  // Simli refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const simliClientRef = useRef<SimliClient | null>(null);
  const simliAudioBufferRef = useRef<Uint8Array[]>([]);

  /**
   * References for
   * - Rendering audio visualization (canvas)
   * - Autoscrolling event logs
   */
  const clientCanvasRef = useRef<HTMLCanvasElement>(null);
  const serverCanvasRef = useRef<HTMLCanvasElement>(null);
  const eventsScrollHeightRef = useRef(0);
  const eventsScrollRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<string>(new Date().toISOString());

  /**
   * All of our variables for displaying application state
   * - items are all conversation items (dialog)
   * - realtimeEvents are event logs, which can be expanded
   * - memoryKv is for set_memory() function
   */
  const [items, setItems] = useState<ItemType[]>([]);
  const [realtimeEvents, setRealtimeEvents] = useState<RealtimeEvent[]>([]);
  const [expandedEvents, setExpandedEvents] = useState<{
    [key: string]: boolean;
  }>({});
  const [isConnected, setIsConnected] = useState(false);
  const [canPushToTalk, setCanPushToTalk] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [memoryKv, setMemoryKv] = useState<{ [key: string]: any }>({});

  /**
   * When you click the API key
   */
  const resetAPIKey = useCallback(() => {
    const apiKey = prompt('OpenAI API Key');
    if (apiKey !== null) {
      localStorage.clear();
      localStorage.setItem('tmp::voice_api_key', apiKey);
      window.location.reload();
    }
  }, []);

  const isSimliDataChannelOpen = () => {
    if (!simliClientRef.current) return false;

    // Access internal properties (may vary depending on SimliClient implementation)
    const pc = (simliClientRef.current as any).pc as RTCPeerConnection | null;
    const dc = (simliClientRef.current as any).dc as RTCDataChannel | null;

    return (
      pc !== null &&
      pc.iceConnectionState === 'connected' &&
      dc !== null &&
      dc.readyState === 'open'
    );
  };

  /**
   * Connect to conversation:
   * WavRecorder takes speech input, WavStreamPlayer output, client is API client
   */
  const connectConversation = useCallback(async () => {
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    // Define audio constraints for noise suppression, echo cancellation, and auto gain control
    const constraints = {
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    };

    // Set state variables
    startTimeRef.current = new Date().toISOString();
    setIsConnected(true);
    setRealtimeEvents([]);
    setItems(client.conversation.getItems());

    // Start Simli WebRTC connection
    if (simliClientRef.current) {
      simliClientRef.current.start();

      // Send empty audio data to Simli
      const audioData = new Uint8Array(6000).fill(0);
      simliClientRef.current.sendAudioData(audioData);
      console.log('Sent initial empty audio data to Simli');
    }

    // Now connect to OpenAI's realtime API
    await client.connect();

    // Connect to microphone
    await wavRecorder.begin();

    // Connect to audio output
    await wavStreamPlayer.connect();

    if (client.getTurnDetectionType() === 'server_vad') {
      await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }
  }, []);

  const changeVoiceType = async () => {
    const client = clientRef.current;

    /**
    // Access the voice setting from the environment variable
    */
    // Define allowed voices
    const allowedVoices: Array<'shimmer' | 'alloy' | 'echo'> = ['shimmer', 'alloy', 'echo'];

    // Get voice from environment variable (defaults to 'shimmer' if not set)
    const voice = process.env.REACT_APP_VOICE || 'shimmer';

    // Validate that the voice is one of the allowed options
    const validVoice = allowedVoices.includes(voice as 'shimmer' | 'alloy' | 'echo')
      ? (voice as 'shimmer' | 'alloy' | 'echo')
      : 'shimmer';  // Default to 'shimmer' if invalid

    client.updateSession({
      voice: validVoice,
    });
  };

  // Use useEffect to call the function on component mount
  useEffect(() => {
    changeVoiceType();
  }, []);

  /**
   * Disconnect and reset conversation state
   */
  const disconnectConversation = useCallback(async () => {
    setIsConnected(false);
    setRealtimeEvents([]);
    setItems([]);
    setMemoryKv({});

    const client = clientRef.current;
    client.disconnect();

    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.end();

    const wavStreamPlayer = wavStreamPlayerRef.current;
    await wavStreamPlayer.interrupt();

    // Close Simli connection
    if (simliClientRef.current) {
      simliClientRef.current.close();
    }
  }, []);

  const deleteConversationItem = useCallback(async (id: string) => {
    const client = clientRef.current;
    client.deleteItem(id);
  }, []);

  /**
   * In push-to-talk mode, start recording
   * .appendInputAudio() for each sample
   */
  const startRecording = async () => {
    console.log('start recording')
    setIsRecording(true);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;
    const trackSampleOffset = await wavStreamPlayer.interrupt();
    if (trackSampleOffset?.trackId) {
      const { trackId, offset } = trackSampleOffset;
      await client.cancelResponse(trackId, offset);
    }
    await wavRecorder.record((data) => client.appendInputAudio(data.mono));
  };

  /**
   * In push-to-talk mode, stop recording
   */
  const stopRecording = async () => {
    setIsRecording(false);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.pause();
    client.createResponse();
  };

  /**
   * Auto-scroll the event logs
   */
  useEffect(() => {
    if (eventsScrollRef.current) {
      const eventsEl = eventsScrollRef.current;
      const scrollHeight = eventsEl.scrollHeight;
      // Only scroll if height has just changed
      if (scrollHeight !== eventsScrollHeightRef.current) {
        eventsEl.scrollTop = scrollHeight;
        eventsScrollHeightRef.current = scrollHeight;
      }
    }
  }, [realtimeEvents]);

  /**
   * Auto-scroll the conversation logs
   */
  useEffect(() => {
    const conversationEls = [].slice.call(
      document.body.querySelectorAll('[data-conversation-content]')
    );
    for (const el of conversationEls) {
      const conversationEl = el as HTMLDivElement;
      conversationEl.scrollTop = conversationEl.scrollHeight;
    }
  }, [items]);

  /**
   * Set up render loops for the visualization canvas
   */
  useEffect(() => {
    let isLoaded = true;

    const wavRecorder = wavRecorderRef.current;
    const clientCanvas = clientCanvasRef.current;
    let clientCtx: CanvasRenderingContext2D | null = null;

    const wavStreamPlayer = wavStreamPlayerRef.current;
    const serverCanvas = serverCanvasRef.current;
    let serverCtx: CanvasRenderingContext2D | null = null;

    const render = () => {
      if (isLoaded) {
        if (clientCanvas) {
          if (!clientCanvas.width || !clientCanvas.height) {
            clientCanvas.width = clientCanvas.offsetWidth;
            clientCanvas.height = clientCanvas.offsetHeight;
          }
          clientCtx = clientCtx || clientCanvas.getContext('2d');
          if (clientCtx) {
            clientCtx.clearRect(0, 0, clientCanvas.width, clientCanvas.height);
            const result = wavRecorder.recording
              ? wavRecorder.getFrequencies('voice')
              : { values: new Float32Array([0]) };
            WavRenderer.drawBars(
              clientCanvas,
              clientCtx,
              result.values,
              '#0099ff',
              10,
              0,
              8
            );
          }
        }
        if (serverCanvas) {
          if (!serverCanvas.width || !serverCanvas.height) {
            serverCanvas.width = serverCanvas.offsetWidth;
            serverCanvas.height = serverCanvas.offsetHeight;
          }
          serverCtx = serverCtx || serverCanvas.getContext('2d');
          if (serverCtx) {
            serverCtx.clearRect(0, 0, serverCanvas.width, serverCanvas.height);
            const result = wavStreamPlayer.analyser
              ? wavStreamPlayer.getFrequencies('voice')
              : { values: new Float32Array([0]) };
            WavRenderer.drawBars(
              serverCanvas,
              serverCtx,
              result.values,
              '#009900',
              10,
              0,
              8
            );
          }
        }
        window.requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      isLoaded = false;
    };
  }, []);

  /**************************************************************************************
   * Core RealtimeClient and audio capture setup
   * Set all of our instructions, tools, events, and more
   */
  useEffect(() => {
    // Get refs
    const wavStreamPlayer = wavStreamPlayerRef.current;
    const client = clientRef.current;

    // Initialize SimliClient
    if (videoRef.current && audioRef.current) {
      const simliApiKey = process.env.REACT_APP_SIMLI_API_KEY;
      const simliFaceID = process.env.REACT_APP_SIMLI_FACE_ID;

      if (simliApiKey && simliFaceID) {
        const SimliConfig = {
          apiKey: simliApiKey,
          faceID: simliFaceID,
          handleSilence: true,
          videoRef: videoRef,
          audioRef: audioRef,
        };

        simliClientRef.current = new SimliClient();
        simliClientRef.current.Initialize(SimliConfig);

        console.log('Simli Client initialized');
      } else {
        console.error('Simli API key or Face ID is not defined');
      }
    }

    // Set instructions
    client.updateSession({ instructions: instructions });
    // Set transcription, otherwise we don't get user transcriptions back
    client.updateSession({ input_audio_transcription: { model: 'whisper-1' } });

    /**
    * Example of REST API integration with Botina.
    *
    * This section of code demonstrates how to integrate a REST API into Botina. 
    * The approach shown here can be adapted to connect Botina to any API, 
    * whether internal bank APIs for account details, securities, transactions, or external APIs for additional data sources.
    *
    * Botina's flexible architecture allows her to connect with various endpoints in real time, process the information retrieved,
    * and provide actionable insights on the spot. By following this example, you can integrate any other bank or third-party API into the system.
    * 
    * Key features of this integration include:
    * 1. Secure API connection using authentication mechanisms.
    * 2. Real-time data retrieval and processing.
    * 3. Adaptability to various API response structures.
    * 4. Seamless integration into existing bank systems and portals.
    * 
    * This specific example connects to NewsApi, demonstrating Botina's capability to retrieve and process data in real time.
    * By following the same principles, other APIs can be easily integrated to enhance Botina's functionality in any corporate or banking environment.
    *
    */

    client.addTool(
      {
        name: 'get_news',
        description:
          'Retrieves news articles related to a specific company name or keyword (one or two words). The articles are sorted by relevancy, limited to 25, and from the past 7 days.',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The company name or specific keyword to search news articles for (limited to one or two words).',
            },
          },
          required: ['query'],
        },
      },
      async ({ query }: { [key: string]: any }) => {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        if (!apiKey) {
          throw new Error('News API key is not defined. Please set REACT_APP_NEWS_API_KEY in your .env file.');
        }
        const pageSize = 25;
        const sortBy = 'relevancy';
        const today = new Date();
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 7);

        const formattedFromDate = fromDate.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format

        // Ensure query is limited to one or two words
        const words = query.trim().split(/\s+/);
        if (words.length > 2) {
          throw new Error('Query should be limited to one or two words.');
        }

        // Enclose query in double quotes
        const formattedQuery = `"${words.join(' ')}"`;

        const result = await fetch(
          `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${encodeURIComponent(
            formattedQuery
          )}&from=${formattedFromDate}&sortBy=${sortBy}&pageSize=${pageSize}`
        );

        const json = await result.json();
        return json;
      }
    );

    // handle realtime events from client + server for event logging
    client.on('realtime.event', (realtimeEvent: RealtimeEvent) => {
      setRealtimeEvents((realtimeEvents) => {
        const lastEvent = realtimeEvents[realtimeEvents.length - 1];
        if (lastEvent?.event.type === realtimeEvent.event.type) {
          lastEvent.count = (lastEvent.count || 0) + 1;
          return realtimeEvents.slice(0, -1).concat(lastEvent);
        } else {
          return realtimeEvents.concat(realtimeEvent);
        }
      });
    });
    client.on('error', (event: any) => console.error(event));
    client.on('conversation.interrupted', async () => {
      // Stop sending further audio data to Simli
      simliAudioBufferRef.current = [];

    });

    client.on('conversation.updated', async ({ item, delta }: any) => {
      const items = client.conversation.getItems();

      if (delta?.audio) {
        if (simliClientRef.current) {
          const audioData = new Int16Array(delta.audio);
          const resampledAudioData = resampleAudioData(audioData, 24000, 16000);

          if (isSimliDataChannelOpen()) {
            // Send buffered audio first
            if (simliAudioBufferRef.current.length > 0) {
              simliAudioBufferRef.current.forEach((bufferedData) => {
                simliClientRef.current!.sendAudioData(bufferedData);
              });
              simliAudioBufferRef.current = [];
            }
            // Send current resampled audio data
            const resampledAudioDataUint8 = new Uint8Array(resampledAudioData.buffer);
            simliClientRef.current.sendAudioData(resampledAudioDataUint8);
          } else {
            // Buffer the resampled audio data
            const resampledAudioDataUint8 = new Uint8Array(resampledAudioData.buffer);
            simliAudioBufferRef.current.push(resampledAudioDataUint8);
            console.warn('Data channel is not open yet, buffering audio data');
          }
        }
      }

      if (item.status === 'completed' && item.formatted.audio?.length) {
        const wavFile = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000
        );
        item.formatted.file = wavFile;
      }
      setItems(items);
    });

    setItems(client.conversation.getItems());

    return () => {
      // cleanup; resets to defaults
      client.reset();

      // Close SimliClient on unmount
      if (simliClientRef.current) {
        simliClientRef.current.close();
      }
    };
  }, []);

  const getButtonName = () => {
    console.log('getButtonName', isConnected)
    return isConnected ? 'Disconnect' : 'Connect'
  }

  /***************************************************************************************
   * Render the application
   */
  return (
      <div data-component="ConsolePage">
        <div className="content-top">
          <div className="content-title">
            {/*<img src="/logoCoBa.png"/>*/}
            {/*<span>Bottina</span>*/}
          </div>
          <div className="content-api-key">
            {!USE_LOCAL_RELAY_SERVER_URL && (
                <CustomButton
                    icon={Edit}
                    iconPosition="end"
                    buttonStyle="flush"
                    label={`api key: ${apiKey.slice(0, 3)}...`}
                    onClick={() => resetAPIKey()}
                />
            )}
          </div>
        </div>

        <div className="widget-root" style={{marginTop: '100px'}}>

          {/*<h2>BOTTINA WIDGET</h2>*/}
          <div className="yellow-rectangle">
            <Grid container sx={{height: 400, width: 1200}}>

              {/* Left Section */}
              <Grid item xs={4}>
                <div className="bottina-background">
                  <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{width: '100%', height: 'auto'}}
                  />
                  <audio ref={audioRef} autoPlay/>
                </div>
              </Grid>

              {/* Right Section */}
              <Grid item xs={8}>
                <Grid container direction="column" sx={{height: '100%'}}>

                  {/* First Row */}
                  <Grid item container sx={{height: 250}}>
                    <div className="bottina-input">
                      <div className="center-text">
                        {!items.length && "...let's get connected!"}
                        {items.map((conversationItem, i) => {
                          return (
                              <div className="conversation-item" key={conversationItem.id}>
                                <div className={`speaker ${conversationItem.role || ''}`}>
                                  <div>
                                    {(
                                        conversationItem.role || conversationItem.type
                                    ).replaceAll('_', ' ')}
                                  </div>
                                  <div
                                      className="close"
                                      onClick={() =>
                                          deleteConversationItem(conversationItem.id)
                                      }
                                  >
                                    <X />
                                  </div>
                                </div>
                                <div className="speaker-content">
                                  {conversationItem.type === 'function_call_output' && (
                                      <div>{conversationItem.formatted.output}</div>
                                  )}
                                  {!!conversationItem.formatted.tool && (
                                      <div>
                                        {conversationItem.formatted.tool.name}(
                                        {conversationItem.formatted.tool.arguments})
                                      </div>
                                  )}
                                  {!conversationItem.formatted.tool &&
                                      conversationItem.role === 'user' && (
                                          <div>
                                            {conversationItem.formatted.transcript ||
                                                (conversationItem.formatted.audio?.length
                                                    ? '(awaiting transcript)'
                                                    : conversationItem.formatted.text ||
                                                    '(item sent)')}
                                          </div>
                                      )}
                                  {!conversationItem.formatted.tool &&
                                      conversationItem.role === 'assistant' && (
                                          <div>
                                            {conversationItem.formatted.transcript ||
                                                conversationItem.formatted.text ||
                                                '(truncated)'}
                                          </div>
                                      )}
                                  {conversationItem.formatted.file && (
                                      <audio
                                          src={conversationItem.formatted.file.url}
                                          controls
                                      />
                                  )}
                                </div>
                              </div>
                          );
                        })}
                    </div>
                    </div>
                  </Grid>

                  {/* Second Row */}
                        <Grid
                            item
                            container
                            sx={{height: 150}}
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                          <div style={{display: 'flex', gap: '16px', marginRight: '30px', marginTop: '30px'}}>
                            {/* Mic Button */}
                            <Button
                                variant="contained"
                                sx={{
                                  width: '560px',
                                  height: '60px',
                                  backgroundColor: 'rgba(128, 128, 128, 0.3)',
                                  borderRadius: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  '&:hover': {
                                    backgroundColor: 'darkgrey',
                                  },
                                  '&:focus': {
                                    outline: 'none',  // Removes the focus outline
                                    boxShadow: 'none', // Removes any box shadow on focus
                                  },
                                  '&:active': {
                                    outline: 'none',  // Removes the outline on active state
                                    boxShadow: 'none', // Removes any box shadow on active state
                                  },
                                }}
                                disabled={!isConnected || !canPushToTalk}
                                onMouseDown={() => {startRecording()}}
                                onMouseUp={() => {stopRecording()}}>
                              <MicIcon/>
                            </Button>

                            {/* Connect Button */}
                            <Button
                                variant="contained"
                                sx={{
                                  width: '160px',
                                  height: '60px',
                                  backgroundColor: 'rgba(128, 128, 128, 0.3)',
                                  borderRadius: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  '&:hover': {
                                    backgroundColor: 'darkgrey',
                                  },
                                  '&:focus': {
                                    outline: 'none',  // Removes the focus outline
                                    boxShadow: 'none', // Removes any box shadow on focus
                                  },
                                  '&:active': {
                                    outline: 'none',  // Removes the outline on active state
                                    boxShadow: 'none', // Removes any box shadow on active state
                                  },
                                }}
                                onClick={() => isConnected ? disconnectConversation() : connectConversation()}>
                              {getButtonName()}
                            </Button>
                          </div>
                        </Grid>
                  </Grid>
                </Grid>
              </Grid>
          </div>
        </div>
      </div>
  );
}
