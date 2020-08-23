import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = styled(CircularProgress)`
  && {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

export default Spinner;
