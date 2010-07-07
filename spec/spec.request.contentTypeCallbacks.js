describe 'Express'
  before_each
    reset()
  end
  
  describe 'Request'
    
    describe 'when html is defined as a content callback'
      describe 'given "text/html"'        
        it 'should return html'
          get('/users/:id', function() {
            self = this
            this.content('html', function() { 
              return 'User with id ' + self.param('id') + ' requested'
            })
          })
          get('/users/7', { headers: { 'content-type': 'text/html' }}).body.should.eql 'User with id 7 requested'
        end
      end
      
      describe 'given "application/json"'
        it 'should return an HTTP 415 - Unsupported Media Type'
          get('/', function() {
            this.content('html', function() { 
              return '<html></html>'
            })
          })
          get('/', { headers: { 'content-type': 'application/json' }}).body.should.eql 'Unsupported Media Type'
        end
      end
    end
    
    describe 'when traditional callback code is present alongside content callbacks'
      describe 'given "text/html"'
        it 'return the html, ignoring the routes callback'
          get('/', function() {
            this.content('html', function() { 
              return '<html></html>'
            })
            return 'not overriden :('
          })
          get('/', { headers: { 'content-type': 'text/html' }}).body.should.eql '<html></html>'
        end
      end
    end
    
  end
end