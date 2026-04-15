function tiger(){
    g_shapesList = [];

    let head = new Triangle();
    head.position = [0.0, 0.0];
    head.color = [1.0, 1.0, 0.0, 1.0];
    head.size = 20;

    g_shapesList.push(head);
    
    renderAllShapes();
}