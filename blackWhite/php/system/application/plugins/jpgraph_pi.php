<?php
function linechart($ydata, $title='Line Chart')
{
    require_once("jpgraph/jpgraph.php");
    require_once("jpgraph/jpgraph_line.php");    
    
    // Create the graph. These two calls are always required
    $graph = new Graph(350,250,"auto",60);
    $graph->SetScale("textlin");
    
    // Setup title
    $graph->title->Set($title);
    
    // Create the linear plot
    $lineplot=new LinePlot($ydata);
    $lineplot->SetColor("blue");
    
    // Add the plot to the graph
    $graph->Add($lineplot);
    
    return $graph; // does PHP5 return a reference automatically?
}

function bargraph($data)
{
	require_once("jpgraph/jpgraph.php");
    require_once("jpgraph/jpgraph_bar.php");

	$graph = new Graph(1000 , 300);
	$graph->SetScale("textlin"); //设置刻度模式
	$graph->SetShadow(); //设置阴影
	$graph->img->SetMargin(40 , 30 , 20 , 40) ;//设置边距
	$barplot = new BarPlot($data['count']);
	$barplot->SetFillColor('blue') ; // 设置颜色
	$barplot->value->SetFormat('%d');//格式化，%d是整数，%f是浮点型
	$barplot->value->Show(); //设置显示数字
	$graph->Add($barplot); //将柱形图添加到图像中
	//设置标题和X-Y轴标题
	$graph->title->Set('http://www.iyohui.com -> user count');
	$graph->xaxis->title->Set("Day");
	$graph->yaxis->title->Set("Total Count");
	$graph->xaxis->SetTickLabels($data['date']);
	 

	//设置字体,因为修改过jpgraph.php 所以可以不使用
	/*
	$graph->title->SetFont(FF_SIMSUN , FS_BOLD);
	$graph->yaxis->title->SetFont(FF_SIMSUN , FS_BOLD);
	$graph->xaxis->title->SetFont(FF_SIMSUN , FS_BOLD);
	*/

	$graph->Stroke();
}
?>