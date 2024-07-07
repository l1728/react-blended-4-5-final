import { Wave } from 'react-animated-text';

import { Container, Heading, Section, RatesList, Loader } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentCurrency,
  selectFilteredRates,
  selectIsLoading,
} from 'reduxState/selector';
import { useEffect } from 'react';
import { fetchRates } from 'reduxState/operations';

const Rates = () => {
  const isError = false;
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectCurrentCurrency);
  const filteredRates = useSelector(selectFilteredRates);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchRates(baseCurrency));
  }, [dispatch, baseCurrency]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {isLoading && <Loader />}
        {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
