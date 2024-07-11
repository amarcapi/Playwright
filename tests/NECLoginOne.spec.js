const { test, expect } = require('@playwright/test');
import {testLogin} from './Commands/Login';

test('test', async ({ page }) => {
  await testLogin(page);
});