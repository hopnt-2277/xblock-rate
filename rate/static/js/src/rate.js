/* Javascript for CourserateXBlock. */
function CourserateXBlock(runtime, element) {

    function updateCount(result) {
        $('.count input').val(result.rating);
        $('.review input').val(result.review);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $('.submit').click(function(eventObject) {
        let data = {
            'rating': $('.count input').val(),
            'review': $('.review input').val()
        }
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify(data),
            success: updateCount
        });
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
