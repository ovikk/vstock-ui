import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar'

import {
  getStatsAll,
  getStatsYear,
  getStatsMonth,
  getStatsWeek,
} from './statsActions';

import Switcher from 'components/Switcher';
import BestDeals from './BestDeals';
import BarStats from './BarStats';
import OverallStats from './OverallStats';

const pageStates = { all: 0, year: 1, month: 2, week: 3 };

function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

const theme = {
  axis: {
    fontSize: "14px",
    tickColor: "#fff",
    ticks: {
      text: {
        fill: "#ffffff"
      }
    },
  },
  grid: {
    line: {
      stroke: "#fff",
      fill: "#fff",
    }
  }
};

const Stats = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const pageQuery = query.get('page');
  const [pageState, setPageState] = useState(pageStates[pageQuery] || 0);

  const { statsAll, statsYear, statsMonth, statsWeek } = useSelector(
    (state) => state.stats
  );

  const statsList = [statsAll, statsYear, statsMonth, statsWeek];

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (stats === undefined) {
  //     dispatch(getStats());
  //   }
  // }, []);


  useEffect(() => {
    if (pageState === 0) {
      history.push('/app/stats?page=all');
      statsAll === undefined && dispatch(getStatsAll());
    }

    if (pageState === 1) {
      history.push('/app/stats?page=year');
      statsYear === undefined && dispatch(getStatsYear());
    }

    if (pageState === 2) {
      history.push('/app/stats?page=month');
      statsMonth === undefined && dispatch(getStatsMonth());
    }

    if (pageState === 3) {
      history.push('/app/stats?page=week');
      statsWeek === undefined && dispatch(getStatsWeek());
    }
  }, [pageState]);

  if (statsList[pageState] === undefined) {
    return <div>spinner</div>;
  }

  const stats = statsList[pageState];

  return (
    <MainWrapper>
      <Switcher
        currentState={pageState}
        setState={setPageState}
        statesArray={['Все время', 'Год', 'Месяц', 'Неделя']}
        width="150px"
      />

      <Row style={{ marginRight: '20px' }}>
        <Card style={{ height: 540, marginRight: '20px', width: '80%' }}>
          <CardTitle>Аналитика Прибыли</CardTitle>
          <ChartWrapper>
            <ResponsiveBar
              data={(stats.sales.sales || []).map(x => {
                const date = new Date(x.sell_date);
                const displayDate = `${date.getDate()}/${date.getMonth() + 1}`
                return { ...x, profitColor: 'hsl(202, 71%, 52%)', displayDate }
              }).sort(byField('sell_date'))}
              keys={['profit']}
              indexBy="displayDate"
              enableLabel={false}
              gridXValues={sales.map((x, index) => index)}
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              colors={{ scheme: 'category10' }}
              theme={theme}
              label={d => `${d.profitColor}: ${d.value}`}

              axisBottom={{
                tickSize: 12,
                tickPadding: 12,
                tickRotation: 45,
                legendOffset: 35
              }}
            />
          </ChartWrapper>
          <Row>
            <span style={{ marginRight: '20px' }}>
              <div>
                <Label style={{ width: 'unset' }}>Сумма продаж</Label>
              </div>
              <div>
                <Value style={{ width: 'unset' }}>{stats.analytics.total_sold}</Value>
              </div>
            </span>
            <span style={{ marginRight: '20px' }}>
              <div>
                <Label style={{ width: 'unset' }}>Общая прибыль</Label>
              </div>
              <div>
                <Value style={{ width: 'unset' }}>{stats.analytics.profit}</Value>
              </div>
            </span>
            <span style={{ marginRight: '20px' }}>
              <div>
                <Label style={{ width: 'unset' }}>Количество продаж</Label>
              </div>
              <div>
                <Value style={{ width: 'unset' }}>{stats.analytics.sold_items}</Value>
              </div>
            </span>
          </Row>
        </Card>

        <Card style={{ height: 540, width: '20%' }}>
          <ColFlex>
            <span>
              <Label>Цена инвентаря</Label>
              <Value>{stats.analytics.total_active}</Value>
            </span>
            <span>
              <Label>Цена подписок</Label>
              <Value>0</Value>
            </span>
            <span>
              <Label>Рыночная цена</Label>
              <Value>0</Value>
            </span>
            <span>
              <Label>Кол-во подписок</Label>
              <Value>0</Value>
            </span>
            <span>
              <Label>Товары в инвентаре</Label>
              <Value>{stats.analytics.active_items}</Value>
            </span>
            {/* Лучшие продажи */}
            {/* <BestDeals bestDeals={stats.best_deals} /> */}
          </ColFlex>
        </Card>

      </Row>
      <PartialStatsWrapper>
        <Card>
          <CardTitle>Анализ размеров по инвентарю</CardTitle>
          {stats.size_count && (
            <BarStats
              items={stats.size_count.map((o) => {
                return { name: o.size, amount: o.amount };
              })}
            />
          )}

          <Divider />

          <CardTitle>Анализ по брендам</CardTitle>
          {stats.brand_count && (
            <BarStats
              items={stats.brand_count.map((o) => {
                return { name: o.brand, amount: o.amount };
              })}
            />
          )}
        </Card>
        <Card>
          {/* <OverallStats
              turnover={stats.turnover}
              item_count={stats.item_count}
            /> */}
        </Card>
      </PartialStatsWrapper>
      {/* </StatsWrapper> */}
    </MainWrapper>
  );
};

export default Stats;

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 40px 20px 10px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;

  background-color: ${({ theme }) => theme.colors.background};
  overflow-x: scroll;
  overflow-y: scroll;
`;

const StatsWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-left: -10px;
`;

const PartialStatsWrapper = styled.div`
  flex: 1;
`;

const Card = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.modalBackground};
  box-shadow: 22px 55px 33px rgba(0, 0, 0, 0.15);
  border-radius: 25px;
  box-sizing: border-box;
  padding: 25px 40px;
  display: flex;
  flex-direction: column;
  width: 700px;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px 0px;
  padding: 0px 10px;
  border-bottom: ${({ theme }) => `2px solid rgba(57, 73, 116, 0.3)`};
`;

const CardTitle = styled.span`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 24px;
`;

const Row = styled.div`
  display: flex;
`;

const Label = styled.label`
  font-size: 18px;
  line-height: 21px;

  color: #6578A9;
  display: inline-block;
  width: 100%;
`;

const Value = styled.label`
  font-size: 36px;
  line-height: 41px;
  /* identical to box height */

  color: #FFFFFF;
  display: inline-block;
  width: 100%;
`;

const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ChartWrapper = styled.div`
  height: 400px;
`;