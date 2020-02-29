const add = $('li.add')
const hashMap = JSON.parse(localStorage.getItem('siteList')) || ['https://codepen.io/','https://iconfont.cn/','https://stackoverflow.com/','https://github.com/','https://juejin.im/'];
const render = () => {
    $('li:not(.add)').remove();
    hashMap.forEach((url,index) => {
        $(` <li>
            <div class="site">
                <div class="logo">${simplifyUrl(url)[0].toUpperCase()}</div>
                <div class="link">${simplifyUrl(url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore(add)
        .on('click', () => {window.open(url,"_self")})
        .on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
    })
}
const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\.(.+)/, '')
}

render();

$('.addButton').on('click', () => {
    url = window.prompt('请输入你要添加的网址');
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
    hashMap.push(url);
    render();
}),

$(document).on('keypress',(e) => {
    const {key} = e;
    hashMap.forEach((url) => {
        if(simplifyUrl(url)[0] === key){
            if(!(document.querySelector('.searchInput') === document.activeElement)){
                window.open(url,"_self")
            }
        }
    })
}),

$('.searchInput').on('blur',() => {
    $('.searchForm').removeClass('boxshaow')
}),

$('.searchInput').on('focus',() => {
    $('.searchForm').addClass('boxshaow')
}),
    window.onbeforeunload = () => {
        localStorage.setItem('siteList', JSON.stringify(hashMap))
    }