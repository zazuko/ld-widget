# LdWidget

## Introduction:
The LdWidget is a versatile tool designed to execute SPARQL queries effortlessly. It offers flexibility by allowing users to specify a SPARQL endpoint URL, a query, and an optional button label. Integration is seamless through iframe embedding, with parameters encoded as query parameters in the URL.

## Usage:
To utilize the LdWidget, simply include it as an iframe in your web page. Set the src attribute of the iframe to the URL of the widget, with the parameters encoded as query parameters. It's important to note that all parameters must be URL encoded.

## Configuration:
For enhanced development convenience, append /config to the URL of the widget. This triggers the display of a configuration form, simplifying the process of entering the SPARQL endpoint URL, the query, and the optional button label in a user-friendly manner. This feature eliminates the need for manual query encoding. However, it's worth mentioning that the configuration dialog is intentionally kept minimalistic and may lack aesthetic appeal.

## Parameters:

* q: The SPARQL query to execute.
* endpoint: The URL of the SPARQL endpoint.
* b (optional): The button label.

Here is a configuraiton dialog example url:
[Example Config](https://widget.lindas.admin.ch/config?e=https:%2F%2Flindas.admin.ch%2Fquery&q=PREFIX%20rdf:%20%3Chttp:%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs:%20%3Chttp:%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT%20%3FresultString%20FROM%20%3Chttps:%2F%2Flindas.admin.ch%2Ffsvo%2Frabies%3E%20WHERE%20%7B%0A%20%20%3Fs%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Fidentifier%3E%20%3FvarBind;%0A%20%20%09%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Fquantitativeresult%3E%20%3Fvalue%20;%0A%20%20%20%20%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Fresult%3E%20%3Fresult%20;%0A%20%20%20%20%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Fdate%3E%20%3Fdate;%0A%20%20%09%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Funitcode%3E%20%3Funit%20.%0A%20%20%20%20%20BIND%20(%20IF%20(%20%3Fresult%20%3D%20%3Chttps:%2F%2Fagriculture.ld.admin.ch%2Ffoen%2Frabies%2Fdimension%2Fresult%2Fpositiv%3E,%20%22Sufficient%22,%20%22Insufficient%22%20)%20AS%20%3Fv%20)%0A%20%20%09%20BIND(CONCAT(%22Microchip%20number:%20%22,%3FvarBind,%20%22%20%7C%20%22,%20%3Fv,%20%22%20%7C%20%22,%20%20%22Quantitative%20Result:%20%22,%20str(%3Fvalue),%20%22%20%22,%20%3Funit,%20%22%20%7C%20Date%20of%20blood%20sampling:%20%22,%20str(%3Fdate))%20%20AS%20%3FresultString%20)%20%0A%7D%20ORDER%20BY%20%3Fdate%20LIMIT%201)

## Where is it used?

### Request for rabies titre verification
You can check whether a rabies antibody test that has been carried out by the Swiss Rabies Center is valid, provided you have the laboratory report.

https://www.ivi.admin.ch/ivi/en/home/tollwutzentrale/tollwut-widget.html



# Example 

Check the `src/example.html` file for an example of how to use the widget.