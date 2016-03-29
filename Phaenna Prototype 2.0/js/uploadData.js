window.onload = init();

function init()
{
    var unh = document.getElementById('btn_unhappy');
    var neu = document.getElementById('btn_neutral');
    var hap = document.getElementById('btn_happy');

    unh.addEventListener('click', btnClickHandler);
    neu.addEventListener('click', btnClickHandler);
    hap.addEventListener('click', btnClickHandler);
}

function btnClickHandler(e)
{
    var btn = e.target.id;

    

    btnValue(btn);
}
