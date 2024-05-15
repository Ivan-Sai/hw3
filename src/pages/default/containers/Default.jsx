import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';
import Button from "../../../components/Button";
import {useNavigate} from "react-router-dom";
import Link from "../../../components/Link";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";

function Default() {
  const { formatMessage } = useIntl();

  const navigate = useNavigate();

  return (
      <>
        <Typography>
          {formatMessage({ id: 'title' })}
        </Typography>
          <Link to={{
              pathname: `${pagesURLs[pages.books]}`,
          }}>
            <Button onClick={() => navigate('/books')}
                colorVariant="header"
                variant="text"
            >
              <Typography
                  color="inherit"
                  variant="subtitle"
              >
                <strong>
                  {formatMessage({ id: 'follow' })}
                </strong>
              </Typography>
            </Button>
          </Link>
      </>

  );
}

export default Default;
