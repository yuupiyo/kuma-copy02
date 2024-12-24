// loading
// window.addEventListener('load', function() {
//   const loadingElement = document.querySelector('.js-loading');
//   if (loadingElement) {
//       loadingElement.style.display = 'none';
//   }
// });

// header-menu
document.addEventListener('DOMContentLoaded', function () {
  let state = false; // メニューの状態を保持
  let scrollpos; // スクロール位置を保持

  const menuTrigger = document.querySelector('.p-header__button');
  const body = document.body;
  const header = document.querySelector('header');
  const overlay = document.querySelector('.p-header__overlay');
  const menuLinks = document.querySelectorAll('.p-header__nav-inner a, .p-header__overlay');

  // メニューの開閉処理
  menuTrigger.addEventListener('click', function () {
      if (!state) {
          scrollpos = window.scrollY; // 現在のスクロール位置を取得
          body.classList.add('fixed');
          body.style.top = `-${scrollpos}px`;
          header.classList.add('is-open');
          overlay.classList.add('is-active');
          state = true;
      } else {
          body.classList.remove('fixed');
          body.style.top = '0';
          window.scrollTo(0, scrollpos); // スクロール位置を元に戻す
          header.classList.remove('is-open');
          overlay.classList.remove('is-active');
          state = false;
      }
  });

  // スマホでリンクまたはオーバーレイをクリックしたらメニューを閉じる
  menuLinks.forEach(function (element) {
      element.addEventListener('click', function () {
          if (state) {
              menuTrigger.click(); // メニューのトグルを模倣
          }
      });
  });

  // ウィンドウがPCサイズの場合にスマホメニューをリセット
  const handleResize = function () {
      const breakpoint = 768;
      if (window.innerWidth > breakpoint) {
          body.classList.remove('fixed');
          body.style.top = '0';
          header.classList.remove('is-open');
          overlay.classList.remove('is-active');
          state = false;
      }
  };

  window.addEventListener('load', handleResize);
  window.addEventListener('resize', handleResize);
});
