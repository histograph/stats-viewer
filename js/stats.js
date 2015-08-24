var apiUrl = 'http://localhost:3001/';

var hierarchy = [
  'hg:Address',
  'hg:Building',
  'hg:Monument',
  'hg:Fort',
  'hg:Street',
  'hg:Neighbourhood',
  'hg:Borough',
  'hg:Place',
  'hg:Municipality',
  'hg:Water',
  'hg:Polder',
  'hg:Area',
  'hg:Region',
  'hg:Baljuwschap',
  'hg:Barony',
  'hg:Countship',
  'hg:Heerlijkheid',
  'hg:Departement',
  'hg:Province',
  'hg:Country'
];

var queryResultsFormatters = {
  'http://localhost:3001/stats/queries/liesin-per-dataset': {
    title: 'hg:liesIn per dataset',
    format: function(e, json) {
    // title, description, format()
    }
  },

  'http://localhost:3001/stats/queries/pits-without-relations': {
    title: 'PITs without outgoing or incoming relations',
    format: function(e, json) {

    }
  },

  'http://localhost:3001/stats/queries/samehgconcept-between-datasets': {
    title: 'hg:sameHgConcept relations between datasets',
    format: function(e, json) {

    }
  },

  'http://localhost:3001/stats/queries/types-per-dataset': {
    title: 'Types per dataset',
    format: function(e, json) {
      console.log(json)
    }
  },

  'http://localhost:3001/stats/queries/vacant-pits': {
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

          d3.json(d, function(json) {
            queryResultsFormatters[d].format(container, json);
          });
        }
      });
});