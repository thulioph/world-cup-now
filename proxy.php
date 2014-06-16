<?php
 header('Content-type: text/html; charset=utf-8');

$url = "http://globoesporte.globo.com/temporeal/futebol/central.json";
$dados = file_get_contents($url);

echo $dados;

?>