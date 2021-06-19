import request from 'supertest';
import { expect } from 'chai';
import Container from 'typedi';
import { JwtService } from '@server/core/jwt/jwt.service';

export function checkError(res: request.Response, message?: string, code = 400): void {
  expect(res.body).to.deep.eq({ status: 'error', message });
  expect(res.status).to.eq(code);
}

export function checkValidationError(res: request.Response, errorName: string, code: number, message?: string): void {
  expect(res.body.data).to.be.null;
  expect(res.body.errors[0].name).to.be.eq(errorName);
  expect(res.body.errors[0].code).to.be.eq(code);

  if (message) {
    expect(res.body.errors[0].message).to.be.eq(message);
  }
}

export function checkJWT(token: string, rememberMe?: boolean) {
  const uuidRE = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  const jwtService = Container.get(JwtService);
  const verified = jwtService.verifyToken(token);
  let expected: number;
  if (rememberMe) {
    expected = parseInt(process.env.JWT_REMEMBER_ME_EXPIRATION);
  } else {
    expected = parseInt(process.env.JWT_EXPIRATION);
  }
  const milisecondsExpected = expected * 60 * 60 * 1000;

  expect(uuidRE.test(verified.data.id)).to.true;
  expect(verified.iat).to.equal(verified.exp - milisecondsExpected / 1000);
}
