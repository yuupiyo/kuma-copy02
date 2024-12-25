// スクロールアニメーション
// スクロールイベントで要素を表示する関数
const scrollShow = function () {
  const elements = document.querySelectorAll('[data-scroll]');
  const windowHeight = window.innerHeight;

  elements.forEach(function (element) {
      const pos = element.getBoundingClientRect().top + window.scrollY; // 要素の位置
      const scroll = window.scrollY; // スクロール位置

      if (scroll > pos - windowHeight + windowHeight / 5) {
          element.classList.add('scroll-show');
      } else {
          element.classList.remove('scroll-show');
      }
  });
};

// スクロールイベントにリスナーを追加
window.addEventListener('scroll', scrollShow);

// ページロード時の初期化処理
window.addEventListener('load', function () {
  scrollShow(); // 初期スクロールチェック
  const onloadElements = document.querySelectorAll('.onload-show');
  onloadElements.forEach(function (element) {
      element.classList.add('scroll-show'); // ロード時にクラスを付与
  });
});

// loading
window.addEventListener('load', function() {
  const loadingElement = document.querySelector('.js-loading');
  if (loadingElement) {
      loadingElement.style.display = 'none';
  }
});

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

