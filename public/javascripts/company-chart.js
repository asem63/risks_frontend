/**
 * Created by Asem63 on 23-03-2014.
 */
$(function() {
    var data = [];
    $(".year").each(function( index ) {
            data.push({ y: $( this ).text(), a: $( this ).next().text() })
        });

    Morris.Line({
        element: 'company-chart',
        data: data,
        xkey: 'y',
        ykeys: ['a'],
        labels: ['Mark']
    });
});

