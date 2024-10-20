<?php

namespace Database\Seeders;

use App\Helpers\Enums\CalendarActionTagEnum;
use App\Models\CalendarActionTag;
use App\Models\CalendarActionTemplate;
use App\Models\Idea;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CalendarActionTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cashFlowTag = CalendarActionTag::firstOrCreate([
            'tag' => CalendarActionTagEnum::CASH_FLOW->value,
        ]);

        $loanTag = CalendarActionTag::firstOrCreate([
            'tag' => CalendarActionTagEnum::LOAN->value,
        ]);

        $investmentTag = CalendarActionTag::firstOrCreate([
            'tag' => CalendarActionTagEnum::INVESTMENT->value,
        ]);

        $todoTag = CalendarActionTag::firstOrCreate([
            'tag' => CalendarActionTagEnum::TODO->value,
        ]);

        $shortTermLoanTag = CalendarActionTag::firstOrCreate([
            'tag' => CalendarActionTagEnum::SHORT_TERM_LOAN->value,
        ]);

        $longTermLoanTag = CalendarActionTag::firstOrCreate([
            'tag' => CalendarActionTagEnum::LONG_TERM_LOAN->value,
        ]);

        $paymentTag = CalendarActionTag::firstOrCreate([
            'tag' => CalendarActionTagEnum::PAYMENT->value,
        ]);

        $technicalTag = CalendarActionTag::firstOrCreate([
            'tag' => CalendarActionTagEnum::TECHNICAL->value,
        ]);

        $otherTag = CalendarActionTag::firstOrCreate([
            'tag' => CalendarActionTagEnum::OTHER->value,
        ]);

        // $paymentTemplate = CalendarActionTemplate::create([
        //     'title' => 'Future payment plan',
        //     'description' => 'Discuss future payment plan.',
        // ]);
        // $paymentTemplate->calendarActionTags()->attach([
        //     $paymentTag->id, $shortTermLoanTag->id, $longTermLoanTag->id,
        // ]);

        $cashFlowTemplate = CalendarActionTemplate::create([
            'title' => 'Monthly Cash Flow Review',
            'description' => 'Review the monthly cash flow and financial status.',
        ]);
        $cashFlowTemplate->calendarActionTags()->attach([
            $cashFlowTag->id, $technicalTag->id,
        ]);

        $loanApplicationTemplate = CalendarActionTemplate::create([
            'title' => 'Short Term Loan Application',
            'description' => 'Discuss and prepare documents for short term loan application.',
        ]);
        $loanApplicationTemplate->calendarActionTags()->attach([
            $shortTermLoanTag->id, $technicalTag->id,
        ]);

        $longTermLoanReviewTemplate = CalendarActionTemplate::create([
            'title' => 'Long Term Loan Review',
            'description' => 'Review the status and terms of long term loans.',
        ]);
        $longTermLoanReviewTemplate->calendarActionTags()->attach([
            $longTermLoanTag->id, $technicalTag->id,
        ]);

        // $technicalMeetingTemplate = CalendarActionTemplate::create([
        //     'title' => 'Technical Meeting',
        //     'description' => 'Discuss technical aspects and issues.',
        // ]);
        // $technicalMeetingTemplate->calendarActionTags()->attach([
        //     $technicalTag->id, $otherTag->id,
        // ]);

        $instalmentPaymentReminderTemplate = CalendarActionTemplate::create([
            'title' => 'Payment Awaiting Second Approver',
            'description' => 'You have payment transactions waiting for approval.',
        ]);
        $instalmentPaymentReminderTemplate->calendarActionTags()->attach([
            $paymentTag->id,
        ]);

        $creditArrangementMeetingTemplate = CalendarActionTemplate::create([
            'title' => 'Bond Investment Will Soon Come To Term',
            'description' => 'Discuss options for reinvestment of funds.',
        ]);
        $creditArrangementMeetingTemplate->calendarActionTags()->attach([
            $investmentTag->id, $cashFlowTag->id,
        ]);

        $loanArrangementMeetingTemplate = CalendarActionTemplate::create([
            'title' => 'Long Term Loan prolongation upcoming',
            'description' => 'Discuss and arrange loan terms.',
        ]);
        $loanArrangementMeetingTemplate->calendarActionTags()->attach([
            $todoTag->id, $longTermLoanTag->id,
        ]);

        $papersTemplate = CalendarActionTemplate::create([
            'title' => 'Papers for loan prolongation needed',
            'description' => 'Discuss partnership opportunities and agreements.',
        ]);
        $papersTemplate->calendarActionTags()->attach([
            $todoTag->id, $longTermLoanTag->id,
        ]);

        $technicalAssistanceMeetingTemplate = CalendarActionTemplate::create([
            'title' => 'Scheduled Maintenance Downtime',
            'description' => 'Maintenance downtime Oct 1st 2 - 3 sam.',
        ]);
        $technicalAssistanceMeetingTemplate->calendarActionTags()->attach([
            $technicalTag->id,
        ]);

        $cooworkingTemplate = CalendarActionTemplate::create([
            'title' => 'Coworking Concept',
            'description' => 'Discuss coworking concepts for employees.',
        ]);
        $cooworkingTemplate->calendarActionTags()->attach([
            $technicalTag->id, $otherTag->id,
        ]);

        Idea::create([
            'content' => '70% of the midcap companies see energy cost as the number 1 problem in the future with sustainability close behind. One of the biggest cost factors is office space. Have you thought of coworking concepts for your employees? Need more information?',
            'calendar_action_template_id' => $cooworkingTemplate->id,
        ]);

        $vehicleFloatTemplate = CalendarActionTemplate::create([
            'title' => 'Vehicle Fleet Management',
            'description' => 'Discuss vehicle fleet management and carsharing.',
        ]);
        $vehicleFloatTemplate->calendarActionTags()->attach([
            $technicalTag->id, $otherTag->id,
        ]);

        Idea::create([
            'content' => 'One of the biggest cost drivers in your cash flow is the vehicle fleet. Have you thought about carsharing in order to save costs and gain in sustainability? Need more information?',
            'calendar_action_template_id' => $vehicleFloatTemplate->id,
        ]);

        $foreignCurrienciesTemplate = CalendarActionTemplate::create([
            'title' => 'Foreign Currencies',
            'description' => 'Discuss foreign currency management and exchange rate risk.',
        ]);
        $foreignCurrienciesTemplate->calendarActionTags()->attach([
            $technicalTag->id, $otherTag->id,
        ]);

        Idea::create([
            'content' => 'You have regular payments in foreign currencies - have you thought about securing an advantageous exchange rate to gain in planning security and minimize cost risk? Need more information?',
            'calendar_action_template_id' => $foreignCurrienciesTemplate->id,
        ]);

        $accountingRegulationsTemplate = CalendarActionTemplate::create([
            'title' => 'Accounting Regulations',
            'description' => 'Discuss changes in accounting regulations.',
        ]);
        $accountingRegulationsTemplate->calendarActionTags()->attach([
            $technicalTag->id, $otherTag->id,
        ]);

        Idea::create([
            'content' => 'Changes in accounting regulations will come into force starting January 1st, 2027. What does that mean for your business, what changes ? Join our information session',
            'calendar_action_template_id' => $accountingRegulationsTemplate->id,
        ]);

        // $susutainabilityTemplate = CalendarActionTemplate::create([
        //     'title' => 'Sustainability',
        //     'description' => 'Discuss sustainability and environmental issues.',
        // ]);
        // $susutainabilityTemplate->calendarActionTags()->attach([
        //     $technicalTag->id, $otherTag->id,
        // ]);

        // Idea::create([
        //     'content' => 'Sustainability is one of the main concerns of companies - but how can you include this in your business decisions, what does it mean, what are the next steps ? To get help with these questions  that fits your business click here',
        //     'calendar_action_template_id' => $susutainabilityTemplate->id,
        // ]);
    }
}
