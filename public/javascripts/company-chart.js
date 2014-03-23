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
        goals: [11, 37, 67, 97],
        goalLineColors:['red','orange','blue','green'],
        goalStrokeWidth:2,
        grid:false,
        xkey: 'y',
        ykeys: ['a'],
        labels: ['Mark']
    });
});

