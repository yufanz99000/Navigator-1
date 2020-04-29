const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');

const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject ||
    [
        { logo: 'B', url: 'https://www.bilibili.com' },
        { logo: 'C', url: 'https://www.ctrip.com/' },
        { logo: 'T', url: 'https://www.taobao.com/' }

    ] //用hashmap储存预览结构

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
};


const render = () => { //渲染页面函数
    $siteList.find('li:not(.last').remove(); //渲染html之前要把之前的页面都清除

    hashMap.forEach((node, index) => {
        const $li = $(`<li>
         
           <div class="site">
             <div class="logo">${node.logo[0]}</div>               
             <div class="link">${simplifyUrl(node.url)}</div>
             <div class="delete">x</div>
             <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-close1"></use>
         </svg>
           </div>
          
       </li>`).insertBefore($lastLi)

        $li.on('click', () => {
            window.open(node.url)
        });

        $li.on('click', '.delete', (e) => {
            e.stopPropagation();
            hashMap.splice(index, 1); //点击x就删除这个index索引位置的网站
            //重新渲染
            render();
        })
    });
};

//在addsite之前先render预览页面
render();

//然后进行点击addsite的功能
$('.addSite')
    .on('click', () => {
        let url = window.prompt('您要添加的网址是：');
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url;
        }
        console.log(url);
        hashMap.push({
            logo: simplifyUrl(url)[0],

            url: url
        }); //获取最新的hashmap数组

        render(); //重新渲染页面
    });


window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string); //把hashmap设置为string赋值给x
}

$(document).on('keypress', (e) => {
    const key = e.key;
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url);
        };
    };
})

/*
<li>
<a href="https://www.bilibili.com/">
    <div class="site">
        <div class="logo"></div>
             <img src="images/bilibili.jpg" alt="logo">
        <div class="link">bilibili.com</div>
    </div>
</a>
</li>

<li>
<a href="https://www.taobao.com/ ">
    <div class="site">
        <div class="logo">T</div>
            <!-- <img src="images/taobao.jpg" alt="logo"> -->
        <div class="link">taobao.com</div>
    </div>
</a>
</li>
<li>
<a href="https://news.qq.com/ ">
    <div class="site">
        <div class="logo">N</div>
        <div class="link">news.qq.com</div>
    </div>
</a>
</li>*/
