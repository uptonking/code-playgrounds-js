import './index.css';

const change = (msg: string) => {
  // document.querySelector('root').innerText = msg;
  document.querySelector('#root').innerHTML = `
  <h1>本页面支持热加载 sample-vanilla-app-ts 20221222</h1>
  ${msg}
  <div>
    <input type="text" />
  </div>
  `;
};

change('测试项目 sample-vanilla-app-ts');

// document.querySelector('#root').innerText = `
// Hello, 热加载!
// 等待2秒观察内容变化
// `;

// setTimeout(() => {
//   change('Deferred hello world!');
// }, 2000);
