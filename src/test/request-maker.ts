import { JwtService } from '@server/core/jwt/jwt.service';
import { expect } from 'chai';
import request from 'supertest';
import { Container } from 'typedi';

export class RequestMaker {
  token: string = null;

  jwtService = Container.get(JwtService);

  private readonly port: number = parseInt(process.env.PORT);

  refreshAuth(): string {
    const jwtResponse = this.jwtService.generateToken('1');

    expect(jwtResponse).to.not.have.lengthOf(0);

    this.token = jwtResponse;
    return this.token;
  }

  removeAuth(): void {
    this.token = null;
  }

  async postGraphQL<I = any>(
    query: any,
    variables?: I,
    token?: string,
    expectedStatus = 200,
  ): Promise<request.Response> {
    const agent = request(`http://localhost:${this.port}`).post('/graphql');

    if (token) {
      agent.set('Authorization', token);
    } else if (this.token) {
      agent.set('Authorization', this.token);
    }

    agent.set('Content-Type', 'application/json');

    return agent.send({ query, variables }).expect(this.checkStatus(expectedStatus));
  }

  private checkStatus(expectedStatus: number): (res) => any {
    const assertion = (res: any): void => {
      expect(res).to.be.not.undefined;
      expect(res.statusCode).to.equal(
        expectedStatus,
        `Response status does not match for ${res.req.method} ${res.req.path} \n ${JSON.stringify(res.body)}`,
      );
    };

    return assertion;
  }
}
