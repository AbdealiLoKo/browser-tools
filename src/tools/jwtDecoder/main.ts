import * as $ from 'jquery';
import jwt_decode from 'jwt-decode';
import sign from 'jwt-encode';
$('#jwt-decoded').on('input', ev => {
    const target = ev.target as HTMLInputElement;
    try {
        const decodedHeader = jwt_decode(target.value, { header: true });
        const decodedPayload = jwt_decode(target.value);
        $('#jwt-encoded').val(JSON.stringify({ header: decodedHeader, payload: decodedPayload }));
    } catch (e) {
        $('#jwt-encoded').val(e.message);
    }
});

$('#jwt-encoded').on('input', ev => {
    const target = ev.target as HTMLInputElement;
    try {
        $('#jwt-decoded').val(sign(JSON.parse(target.value), 'secret'));
    } catch (e) {
        $('#jwt-decoded').val(e.message);
    }
});
