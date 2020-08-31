import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
        statesArray={['Все время', 'Год', 'Неделя', 'Месяц']}
        width="150px"
      />

      <StatsWrapper>
        <PartialStatsWrapper style={{ marginRight: '20px' }}>
          <Card style={{ height: 200 }}>
            <CardTitle>Аналитика Прибыли</CardTitle>
          </Card>
          {stats.best_deals && (
            <Card>
              <CardTitle>
                Лучшие продажи
                <BestDeals bestDeals={stats.best_deals} />
              </CardTitle>
            </Card>
          )}
        </PartialStatsWrapper>
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
            <OverallStats
              turnover={stats.turnover}
              item_count={stats.item_count}
            />
          </Card>
        </PartialStatsWrapper>
      </StatsWrapper>
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
