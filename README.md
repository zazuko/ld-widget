# LdWidget

The LdWidget is a widget that provides a simple way to perform small SPARQL queries, such as querying a chip number and getting the result back. It can be configured with link query parameters and can be easily included as an iframe into an existing website. The widget is designed to be lightweight and easy to use, making it a great choice for developers who want to add Linked Data querying capabilities to their web applications without having to write complex code.

## Usage

The LdWidget takes a SPARQL endpoint URL and a query as parameters, and an optional button label. To use the widget, simply include it as an iframe in your web page and set the src attribute to the URL of the widget, with the parameters encoded as query parameters. Note that the parameters need to be URL encoded.

To simplify development, you can add the path /config to the URL of the widget, and a configuration form will be displayed. This allows you to enter the SPARQL endpoint URL, the query, and the button label in a user-friendly way, without having to manually encode the query. However, please note that the configuration dialog is intentionally kept simple and may not be aesthetically pleasing.

Parameters:
q - the SPARQL query to execute
endpoint - the SPARQL endpoint URL
b - the button label (optional)

Here is a configuraiton dialog example url:
[Example Config](https://widget.lindas.admin.ch/config?e=https:%2F%2Flindas.admin.ch%2Fquery&q=PREFIX%20rdf:%20%3Chttp:%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs:%20%3Chttp:%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT%20%3FresultString%20FROM%20%3Chttps:%2F%2Flindas.admin.ch%2Ffsvo%2Frabies%3E%20WHERE%20%7B%0A%20%20%3Fs%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Fidentifier%3E%20%3FvarBind;%0A%20%20%09%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Fquantitativeresult%3E%20%3Fvalue%20;%0A%20%20%20%20%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Fresult%3E%20%3Fresult%20;%0A%20%20%20%20%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Fdate%3E%20%3Fdate;%0A%20%20%09%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Funitcode%3E%20%3Funit%20.%0A%20%20%20%20%20BIND%20(%20IF%20(%20%3Fresult%20%3D%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Fresult%2Fpositiv%3E,%20%22Sufficient%22,%20%22Insufficient%22%20)%20AS%20%3Fv%20)%0A%20%20%09%20BIND(CONCAT(%22Microchip%20number:%20%22,%3FvarBind,%20%22%20%7C%20%22,%20%3Fv,%20%22%20%7C%20%22,%20%20%22Quantitative%20Result:%20%22,%20str(%3Fvalue),%20%22%20%22,%20%3Funit,%20%22%20%7C%20Date%20of%20blood%20sampling:%20%22,%20str(%3Fdate))%20%20AS%20%3FresultString%20)%20%0A%7D%20ORDER%20BY%20%3Fdate%20LIMIT%201)

# Example 

Check the `src/example.html` file for an example of how to use the widget.