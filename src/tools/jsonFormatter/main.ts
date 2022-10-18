import * as $ from 'jquery';


$(".controls__button--format").click(function () {
    let val = $('.large-area--input').val();
    const formatted = JSON.stringify(JSON.parse(val as unknown as any), null, 4);

    $('.large-area--output').val(formatted);
    console.log(val)
});


$(".controls__button--minify").click(function () {
    let val = $('.large-area--input').val();
    const minified = JSON.stringify(JSON.parse(val as unknown as any));

    $('.large-area--output').val(minified);
    console.log(val)
});