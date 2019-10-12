import React from 'react';

import { Title } from 'app/components/Title';
import { SubTitle } from 'app/components/SubTitle';
import Input from '@codesandbox/common/lib/components/Input';
import { Button } from '@codesandbox/common/lib/components/Button';
import { protocolAndHost } from '@codesandbox/common/lib/utils/url-generator';

import { Container } from './elements';

export const DevAuthPage = () => {
  const [authCode, setAuthCode] = React.useState('');

  const getJWTToken = () => {
    fetch(`/api/v1/auth/verify/${authCode}`)
      .then(res => res.json())
      .then(res => {
        if (
          window.opener &&
          window.opener.location.origin === window.location.origin
        ) {
          window.opener.postMessage(
            {
              type: 'signin',
              data: {
                jwt: res.data.token,
              },
            },
            protocolAndHost()
          );
        }
      });
  };

  return (
    <Container>
      <Title>Developer Sign In</Title>
      <SubTitle style={{ width: 800 }}>
        Please enter the token you get from{' '}
        <a
          href="https://codesandbox.io/cli/login"
          target="popup"
          rel="noreferrer noopener"
          onClick={e => {
            e.preventDefault();
            window.open(
              'https://codesandbox.io/cli/login',
              'popup',
              'width=600,height=600'
            );
            return false;
          }}
        >
          here
        </a>
        . This token will sign you in with your account from codesandbox.io.
      </SubTitle>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
      >
        <Input
          style={{ width: 600, fontSize: '1.5rem' }}
          placeholder="Auth Code"
          value={authCode}
          onChange={e => {
            setAuthCode(e.target.value);
          }}
        />
        <Button onClick={getJWTToken}>Submit</Button>
      </div>
    </Container>
  );
};