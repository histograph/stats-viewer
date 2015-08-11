var apiUrl = 'http://localhost:3001/';

var queryResultsFormatters = {
  'liesin-per-dataset': {
    title: 'hg:liesIn per dataset',
    format: function(e, json) {
    // title, description, format()
    }
  },

  'pits-without-relations': {
    title: 'PITs without outgoing or incoming relations',
    format: function(e, json) {

    }
  },

  'samehgconcept-between-datasets': {
    title: 'hg:sameHgConcept relations between datasets',
    format: function(e, json) {

    }
  },

  'types-per-dataset': {
    title: 'Types per dataset',
    format: function(e, json) {

    }
  },

  'vacant-pits': {
    title: 'Vacant PITs',
    format: function(e, json) {

    }
  }
};

d3.json(apiUrl + 'stats/queries', function(json) {
  d3.select('#query-results').selectAll('div.query-result')
      .data(json)
    .enter()
      .append('div')
      .attr('class', 'query-result')
      .each(function(d) {
        if (queryResultsFormatters[d]) {
          var e = d3.select(this);
          e.append('h2')
            .html(queryResultsFormatters[d].title);

          var container = e.append('div');

          d3.json(apiUrl + 'stats/queries/' + d, function(json) {
            queryResultsFormatter[d].format(container, json);
          });
        }
      });
});