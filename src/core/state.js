// EduBuddy Shared Session State

export const state = {
  uid: 'tamu',
  ME: null,
  SES: null,
  UM: {}
};

export function getUid() {
  return state.uid;
}

export function setUid(val) {
  state.uid = val;
}

export function getME() {
  return state.ME;
}

export function setME(val) {
  state.ME = val;
}

export function getSES() {
  return state.SES;
}

export function setSES(val) {
  state.SES = val;
}

export function getUM() {
  return state.UM;
}

export function setUM(val) {
  state.UM = val;
}

