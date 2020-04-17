(async () => {
  const src = chrome.extension.getURL('src/js/inject.js');
  console.log(src);
  const inject = await import(src);
  inject.bootstrap(/* chrome: no need to pass it */);
})();
