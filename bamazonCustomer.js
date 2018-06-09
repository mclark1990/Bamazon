//require for .env file
require("dotenv").config();
//require for mysql npm
var mysql = require("mysql");
//require for inquirer npm
var inquirer = require("inquirer");

//create connection to SQL database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: process.env.password,
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as Id: " + connection.threadId);
    display();
});

//function for initial display of products
function display() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, res) {
        console.log("HERE IS WHAT'S FOR SALE");
        console.log("=====================================================")
        for (var i = 0; i < res.length; i++) {
            console.log("Product Id: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);
        };
        console.log("====================================================" + "\n")

        if (err) throw err;
        //console.log(res)
    })

};
//function for user prompt
function userInput() {
    inquirer
        .prompt([
            {
                name: "itemId",
                type: "input",
                message: "Enter the Id of the product you want to buy",
                validate: function (itemId) {
                    if (isNaN(itemId) === false) {
                     return true
                    }
                    else{ 
                    console.log("\n" + "Please enter a valid Id");
                    }
                    return false
                }
            },

            {
                name: "quantity",
                type: "input",
                message: "Enter the quantity you would like to buy",
                validate: function (quantity) {
                    if (isNaN(quantity) === false) {
                      return true 
                    }
                    else{
                    console.log("\n" + "Please enter a valid quantity");
                    }
                }
            }
            //function for updating database
        ]).then(function (answer) {
                var query = "SELECT * FROM products WHERE item_id = ?";
                connection.query(query,[answer.itemId], function (err, result) {
                        if (answer.quantity <= result[0].stock_quantity) {
                            console.log("Nice Choice!")


                            var userQty = result[0].stock_quantity - answer.quantity;
                            connection.query("UPDATE products SET ? WHERE ?", 
                            [

                                    {
                                        stock_quantity: userQty
                                    },
                                    
                                    {
                                        item_id: result[0].item_id
                                    }
                            ],
                                function (err, result) {
                                    console.log(`${result.affectedRows} product updated`)
                                }


                        );
                        //prints out total price of order
                    var userTotal = parseFloat((result[0].price * answer.quantity).toFixed(2)); 
                    console.log("Your total is $" + userTotal + "\n")
                    }
                    
                else {
                    console.log("\n" + "Not enough in stock, please select another item or a different amount" + "\n");
                    userInput();
                };   
                
            

            });    

    });

};

userInput();