
export function dismissError() {
  return {
    type: 'NAV_SET_STATE',
    props: {
      errorMessage: null,
    }
  };
}

export function dismissSuccess() {
  return {
    type: 'NAV_SET_STATE',
    props: {
      successMessage: null,
    }
  };
}
