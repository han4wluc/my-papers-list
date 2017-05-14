
export function dismissError() {
  return {
    type: 'NAV_SET_STATE',
    props: {
      errorMessage: null,
    }
  };
}
