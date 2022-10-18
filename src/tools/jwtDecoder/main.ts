import * as $ from 'jquery';
import jwt_decode from 'jwt-decode';
import sign from 'jwt-encode';
$('#jwt-decoded').on('input', ev => {
    const target = ev.target as HTMLInputElement;
    const decodedHeader = jwt_decode(target.value, { header: true });
    const decodedPayload = jwt_decode(target.value);
    if (decodedHeader && decodedPayload) {
        $('#jwt-encoded').val(JSON.stringify({ header: decodedHeader, payload: decodedPayload }));
    }
});

$('#jwt-encoded').on('input', ev => {
    const target = ev.target as HTMLInputElement;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    $('#jwt-decoded').val(sign(JSON.parse(target.value), 'secret'));
});
