/**
 * @author Thierry de Wit
 */

window.addEventListener('load', init);
var currentValue = 0;
var currentUserAmount = 0;

/**
 * Execute when DOM loads
 */
function init()
{
    var unh = document.getElementById('btn_unhappy');
    var neu = document.getElementById('btn_neutral');
    var hap = document.getElementById('btn_happy');
    var sub = document.getElementById('btn_submitRange');

    unh.addEventListener('click', btnClickHandler);
    neu.addEventListener('click', btnClickHandler);
    hap.addEventListener('click', btnClickHandler);
    sub.addEventListener('click', btnClickHandler);
}

/**
 * Generic click handler.
 *
 * @param e
 */
function btnClickHandler(e)
{
    var btn = e.target.id;

    //console.log(btn);

    if(btn == "btn_submitRange")
    {
        var slider = document.getElementById('rangeMoodInput');

        btnAddValue(slider.value);
    }
    else
    {
        btnValue(btn);
    }
}

/**
 * Add a value to the button that was clicked and adjust slider
 *
 * @param element
 */
function btnValue(element)
{
    var btnValue;
    switch(element)
    {
        case "btn_unhappy":
            btnValue = 0.1;
            break;
        case "btn_neutral":
            btnValue = 0.5;
            break;
        case "btn_happy":
            btnValue = 0.9;
            break;
        default:
            btnValue = 0.5;
            break;
    }


    var range = document.getElementById('rangeMoodInput');
    var rangeText = document.getElementById('rangeMoodInputText');

    range.value = btnValue * 100;
    rangeText.value = range.value;
}

/**
 * each click adds value given at btnValue()
 *
 * @param value
 */
function btnAddValue(value)
{
    var fixedValue = value / 100;
    var totalValue = currentValue + fixedValue;
    var totalUserAmount = currentUserAmount + 1;

    ajaxHandler(totalValue, totalUserAmount);
}

/**
 * ajax handler in order to translate javascript variables to php for the database
 *
 * @param value
 * @param userAmount
 */
function ajaxHandler(value, userAmount)
{
    $.ajax({
        url: "php/sendDataToDB.php",
        type: 'POST',
        data: {
            value: value,
            userAmount: userAmount,
            happiness: value / userAmount
        },
        success: function(data) {
            console.log("The average mood of todays visitors is " + data.happiness);
        },
        error: function()
        {
            drawError();
        }
    });
}

