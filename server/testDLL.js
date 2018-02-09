
const edge = require("edge");

var clrMethod = edge.func({
    assemblyFile: 'HldMainBoard.dll',
    typeName: 'Samples.FooBar.MyType',
    methodName: 'MyMethod'
});

