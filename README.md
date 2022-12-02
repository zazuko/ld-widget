# LdWidget

LD Widget will be a generic Widget for simple queries. 
Right now it's still very experimental.

# Data 
https://ld.zazuko.com/sparql/#query=PREFIX%20cube%3A%20%3Chttps%3A%2F%2Fcube.link%2F%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT%20*%0AFROM%20%3Chttps%3A%2F%2Flindas.admin.ch%2Ffsvo%2Frabies%3E%0AWHERE%20%7B%0A%20%20%3Fsub%20a%20cube%3AObservation%20.%0A%7D%20LIMIT%2010&endpoint=https%3A%2F%2Fld.zazuko.com%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&contentTypeConstruct=application%2Fn-triples%2C*%2F*%3Bq%3D0.9&contentTypeSelect=application%2Fsparql-results%2Bjson%2C*%2F*%3Bq%3D0.9&outputFormat=table
