$(function() {
    var company_names = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: '/js/api/?name=%QUERY'
    });

    company_names.initialize();

    $('#names .typeahead').typeahead({hint: false}, {
        name: 'company-names',
        displayKey: 'value',
        source: company_names.ttAdapter()
    });
});
