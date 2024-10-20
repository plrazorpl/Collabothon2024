import React, { useRef,useState } from 'react';
import { Button,Modal } from 'antd';

import { CloseOutlined, EditOutlined, PlusOutlined,SearchOutlined } from '@ant-design/icons';
import Approvals from '@components/approvals/Approvals';
import BalanceDashboard from '@components/balanceDashboard/balanceDashboard';
import ExchangeRates from '@components/exchangeRates/exchangeRates';
import Kittens from '@components/Kittens/Kittens';
import NewFeaturesWidget from '@components/NewFeaturesWidget/NewFeaturesWidget';
import QuickAccess from '@components/QuickAccess/QuickAccess';

import './DefaultLayout.scss';

type GridWidgetType = {
  id: string;
  type: string;
  component: JSX.Element;
  gridArea: {
    col: number;
    row: number;
    colSpan: number;
    rowSpan: number;
  };
};

const availableWidgetTypes: {
  [key: string]: {
    name: string;
    component: JSX.Element;
    defaultGridArea: { colSpan: number; rowSpan: number };
  };
} = {
  approvals: {
    name: 'Approvals',
    component: <Approvals />,
    defaultGridArea: { colSpan: 1, rowSpan: 2 },
  },
  quickAccess: {
    name: 'Quick Access',
    component: <QuickAccess />,
    defaultGridArea: { colSpan: 1, rowSpan: 1 },
  },
  newFeatures: {
    name: 'New Features',
    component: <NewFeaturesWidget />,
    defaultGridArea: { colSpan: 1, rowSpan: 1 },
  },
  balanceDashboard: {
    name: 'Balance Dashboard',
    component: <BalanceDashboard />,
    defaultGridArea: { colSpan: 1, rowSpan: 1 },
  },
  exchangeRates: {
    name: 'Exchange Rates',
    component: <ExchangeRates />,
    defaultGridArea: { colSpan: 1, rowSpan: 1 },
  },
  kittens: {
    name: 'Kittens',
    component: <Kittens />,
    defaultGridArea: { colSpan: 1, rowSpan: 1 },
  },
};

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const accounts = [
    'Private Customer',
    'Enterprise Customer',
    'Corporate Customer',
  ];

  const navigation = [
    'Accounts & Payments',
    'Financing & Foreign Trade',
    'Investment & Risk Management',
    'Services',
    'My data',
    'Help',
  ];

  const activeNavItem = 'Services';

  const [isEditMode, setIsEditMode] = useState(false);

  const [gridWidgets, setGridWidgets] = useState<GridWidgetType[]>([
    {
      id: 'approvals-1',
      type: 'approvals',
      component: <Approvals />,
      gridArea: { col: 1, row: 1, colSpan: 1, rowSpan: 2 },
    },
    {
      id: 'quickAccess-1',
      type: 'quickAccess',
      component: <QuickAccess />,
      gridArea: { col: 2, row: 1, colSpan: 1, rowSpan: 1 },
    },
    {
      id: 'newFeatures-1',
      type: 'newFeatures',
      component: <NewFeaturesWidget />,
      gridArea: { col: 2, row: 2, colSpan: 1, rowSpan: 1 },
    },
    {
      id: 'balanceDashboard-1',
      type: 'balanceDashboard',
      component: <BalanceDashboard />,
      gridArea: { col: 3, row: 1, colSpan: 1, rowSpan: 1 },
    },
    {
      id: 'exchangeRates-1',
      type: 'exchangeRates',
      component: <ExchangeRates />,
      gridArea: { col: 3, row: 2, colSpan: 1, rowSpan: 1 },
    },
  ]);

  const [originalGridWidgets, setOriginalGridWidgets] = useState<GridWidgetType[]>([]);

  const [isAddWidgetModalVisible, setIsAddWidgetModalVisible] = useState(false);
  const [addWidgetPosition, setAddWidgetPosition] = useState<{ col: number; row: number } | null>(null);

  const widgetCounter = useRef(2); // Начинаем с 2, так как уже есть -1

  const toggleEditMode = () => {
    if (!isEditMode) {
      setOriginalGridWidgets([...gridWidgets]);
    } else {
      setOriginalGridWidgets([]);
    }
    setIsEditMode(!isEditMode);
  };

  const saveChanges = () => {
    setIsEditMode(false);
    setOriginalGridWidgets([]);
  };

  const cancelChanges = () => {
    setGridWidgets(originalGridWidgets);
    setIsEditMode(false);
    setOriginalGridWidgets([]);
  };

  const removeWidget = (id: string) => {
    setGridWidgets(gridWidgets.filter(widget => widget.id !== id));
  };

  const addWidget = (widgetType: string, position: { col: number; row: number }) => {
    const widgetTemplate = availableWidgetTypes[widgetType];
    if (widgetTemplate) {
      const newWidget: GridWidgetType = {
        id: `${widgetType}-${widgetCounter.current++}`, // Уникальный ID
        type: widgetType,
        component: widgetTemplate.component,
        gridArea: {
          col: position.col,
          row: position.row,
          colSpan: widgetTemplate.defaultGridArea.colSpan,
          rowSpan: widgetTemplate.defaultGridArea.rowSpan,
        },
      };
      setGridWidgets([...gridWidgets, newWidget]);
    }
  };

  const openAddWidgetModal = (position: { col: number; row: number }) => {
    setAddWidgetPosition(position);
    setIsAddWidgetModalVisible(true);
  };

  const handleAddWidget = (widgetType: string) => {
    if (addWidgetPosition) {
      addWidget(widgetType, addWidgetPosition);
      setIsAddWidgetModalVisible(false);
      setAddWidgetPosition(null);
    }
  };

  const remainingWidgets = Object.keys(availableWidgetTypes);

  return (
    <div className="defaultLayout">
      <header className="header">
        <div className="header__wrapper">
          <div className="header__topRow">
            <SearchOutlined />
          </div>
          <div className="header__middleRow">
            <div className="header__logo">
              <span>Commerzbank</span>
              <div>
                <img src="/public/logo.png" alt="Logo" />
              </div>
            </div>
            <div className="header__accounts">
              {accounts.map((account, index) => 
                <div key={index} className="header__account">
                  {account}
                </div>
              )}
            </div>
          </div>
          <div className="header__bottomRow">
            {navigation.map((nav, index) => 
              <div
                key={index}
                className={`header__navItem ${
                  activeNavItem === nav ? 'header__navItem--active' : ''
                }`}
              >
                {nav}
              </div>
            )}
          </div>
        </div>
      </header>
      <main>
        {/* Edit button */}
        {isEditMode ? 
          <div className="edit-mode-buttons">
            <Button type="primary" onClick={saveChanges}>
              Save
            </Button>
            <Button onClick={cancelChanges}>
              Cancel
            </Button>
          </div>
          : 
          <div className="edit-button" onClick={toggleEditMode}>
            <EditOutlined />
          </div>
        }

        {/* Grid */}
        <div className="grid-container">
          {gridWidgets.map(widget => 
            <div
              key={widget.id}
              className={`${widget.type}-widget widget-container`}
              style={{
                gridColumn: `${widget.gridArea.col} / span ${widget.gridArea.colSpan}`,
                gridRow: `${widget.gridArea.row} / span ${widget.gridArea.rowSpan}`,
              }}
            >
              {/* Button to delete */}
              {isEditMode && 
                <div className="remove-button" onClick={() => removeWidget(widget.id)}>
                  <CloseOutlined />
                </div>
              }
              {widget.component}
            </div>
          )}

          {/* Place to add new widget */}
          {isEditMode && 
            <>
              {Array.from({ length: 3 }).map((_, colIndex) =>
                Array.from({ length: 2 }).map((_, rowIndex) => {
                  const col = colIndex + 1;
                  const row = rowIndex + 1;
                  const isOccupied = gridWidgets.some(widget =>
                    col >= widget.gridArea.col &&
                    col < widget.gridArea.col + widget.gridArea.colSpan &&
                    row >= widget.gridArea.row &&
                    row < widget.gridArea.row + widget.gridArea.rowSpan
                  );
                  if (!isOccupied) {
                    return (
                      <div
                        key={`empty-${col}-${row}`}
                        className="empty-widget-slot"
                        style={{
                          gridColumn: `${col}`,
                          gridRow: `${row}`,
                        }}
                        onClick={() => {
                          openAddWidgetModal({ col, row });
                        }}
                      >
                        <PlusOutlined />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })
              )}
            </>
          }
        </div>

        {/* Modal windows */}
        <Modal
          title="Add widget"
          visible={isAddWidgetModalVisible}
          onCancel={() => setIsAddWidgetModalVisible(false)}
          footer={null}
        >
          <div className="widget-selection">
            {remainingWidgets.length > 0 ? 
              remainingWidgets.map(widgetType => 
                <div
                  key={widgetType}
                  className="widget-selection__item"
                  onClick={() => handleAddWidget(widgetType)}
                >
                  {availableWidgetTypes[widgetType].name}
                </div>
              )
              : 
              <p>No available widgets.</p>
            }
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default DefaultLayout;
