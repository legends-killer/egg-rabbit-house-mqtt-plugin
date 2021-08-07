// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExtendAgent = require('../../../app/extend/agent');
type ExtendAgentType = typeof ExtendAgent;
declare module 'egg' {
  interface Agent extends ExtendAgentType { }
}