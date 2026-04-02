/* eslint-env jest */
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Comprehensive mock for Worklets (needed for Reanimated 4)
const ID = (v) => v;
const NOOP = () => {};
const mockWorklets = {
  __esModule: true,
  createSerializable: ID,
  isWorkletFunction: () => false,
  isShareableRef: () => true,
  makeShareable: ID,
  makeShareableCloneOnUIRecursive: ID,
  makeShareableCloneRecursive: ID,
  shareableMappingCache: new Map(),
  serializableMappingCache: new Map(),
  getStaticFeatureFlag: () => false,
  setDynamicFeatureFlag: NOOP,
  isSynchronizable: () => false,
  getRuntimeKind: () => 1, // RuntimeKind.ReactNative
  RuntimeKind: { ReactNative: 1, UI: 2, Worklet: 3 },
  createWorkletRuntime: () => ({}),
  runOnRuntime: ID,
  scheduleOnRuntime: (cb) => cb(),
  runOnJS: (v) => v,
  runOnUI: (v) => v,
  runOnUIAsync: (v) => Promise.resolve(),
  makeMutable: (v) => ({ value: v }),
  scheduleOnUI: (v) => v,
};

jest.mock('react-native-worklets', () => mockWorklets);
jest.mock('react-native-worklets-core', () => mockWorklets);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.useReducedMotion = () => false;
  return Reanimated;
});
