import * as $ from 'jquery';

$('#text-decoded').on('input', ev => {
    const target = ev.target as HTMLInputElement;
    $('#text-encoded').val(btoa(target.value));
});

$('#text-encoded').on('input', ev => {
    const target = ev.target as HTMLInputElement;
    $('#text-decoded').val(atob(target.value));
});

const initialText = 'Try it out !';
$('#text-decoded').val(initialText);
$('#text-encoded').val(btoa(initialText));
