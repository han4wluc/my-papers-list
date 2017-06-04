
import AV from 'leancloud-storage';

if(process.env.TEST_MODE === 'true' || process.env.NODE_ENV === 'test'){
  try {
    window;
    AV.init({
      appId: 'KHKam0qUVkgvcHUW3Nnk6A95-MdYXbMMI',
      appKey: 'MfDqF2uYB4yHOAT9drJ6souH',
    });
  } catch(error){
    AV.init({
      appId: 'KHKam0qUVkgvcHUW3Nnk6A95-MdYXbMMI',
      appKey: 'MfDqF2uYB4yHOAT9drJ6souH',
      masterKey: 'wKESEknVYgFgQXkczXvfkd9d'
    });
    AV.Cloud.useMasterKey();
  }
} else {
  const appId = 'qYVDKNY6IUBBT5nzUblg4DLL-MdYXbMMI';
  const appKey = 'KendTOygzk4vUF90CdKJMdKL';
  AV.init({ appId, appKey });
}
  // AV.init({
  //   appId: 'KHKam0qUVkgvcHUW3Nnk6A95-MdYXbMMI',
  //   appKey: 'MfDqF2uYB4yHOAT9drJ6souH',
  //   // masterKey: 'wKESEknVYgFgQXkczXvfkd9d'
  // });
  // AV.Cloud.useMasterKey();
// } else {
//   console.log('AV prod')
//   const appId = 'qYVDKNY6IUBBT5nzUblg4DLL-MdYXbMMI';
//   const appKey = 'KendTOygzk4vUF90CdKJMdKL';
//   AV.init({ appId, appKey });
// }

export default AV;
