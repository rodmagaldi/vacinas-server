import 'reflect-metadata';
import { setup } from 'setup-server';

before(async () => {
  await setup();
});

// require all test files here
require('api/rest/module/user/list-users.test');
