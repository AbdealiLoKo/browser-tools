import * as $ from 'jquery';

function updateCounts(inputText: string) {
    $('#word-count').text(inputText.match(/\b/g).length / 2);
    $('#character-count').text(inputText.match(/\w/g).length);
}

$('#text-input').on('input', ev => {
    const target = ev.target as HTMLInputElement;
    updateCounts(target.value);
});

const initialText = 'Try it out !';
$('#text-input').val(initialText);
updateCounts(initialText);
