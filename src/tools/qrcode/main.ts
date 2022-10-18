import * as $ from 'jquery';
import QRCode from 'qrcode';

$('#qr-generator').submit(async event => {
    const val = $('#text-url').val();
    event.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const imageData = await QRCode.toDataURL(val as string);

    $('#qr-code-img').attr('src', imageData as string);
    $('#download-qr-code').attr('href', imageData as string);
    $('#download-qr-code').show();
});

const initialText = 'Enter the URL!';
$('#text-url').val(initialText);
$('#download-qr-code').hide();
