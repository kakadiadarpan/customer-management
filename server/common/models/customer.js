'use strict';

var settings = require("../../settings.json"),
  referral_bonus = settings.joiningFee * (30 / 100);

module.exports = function(Customer) {

  Customer.disableRemoteMethod("create", true);
  Customer.disableRemoteMethod("upsert", true);
  Customer.disableRemoteMethod("updateAll", true);
  Customer.disableRemoteMethod("updateAttributes", false);

  Customer.disableRemoteMethod("find", true);
  Customer.disableRemoteMethod("findById", true);
  Customer.disableRemoteMethod("findOne", true);

  Customer.disableRemoteMethod("deleteById", true);

  Customer.disableRemoteMethod("confirm", true);
  Customer.disableRemoteMethod("count", true);
  Customer.disableRemoteMethod("exists", true);
  Customer.disableRemoteMethod("resetPassword", true);
  Customer.disableRemoteMethod('createChangeStream', true);
  Customer.disableRemoteMethod('replaceOrCreate', true);
  Customer.disableRemoteMethod('replaceById', true);
  Customer.disableRemoteMethod('upsertWithWhere', true);

  /**
   * Adds a new customer
   * @param {string} email Email of the customer
   * @param {number} referral_id Referral ID
   * @param {Function(Error, object)} callback
   */

  Customer.addCustomer = function(email, referral_id, callback) {
    var status = 200,
      response = {},
      customer_id = new Date().getTime();

    referral_id = referral_id?referral_id:null;
    var customerObj = {
        "customer_id": customer_id,
        "email": email,
        "referral_id": referral_id,
        "payback": 0.0
      };

    Customer.findOrCreate({ where: { email: email } }, customerObj, function(error, customer, created) {
      if (error) {
        status = error.statusCode;
        response.status = status;
        response.error = error;
      }
      if (created) {
        if(referral_id){
          Customer.findById(referral_id, function(error, parentCustomer) {
            if (error) {
              status = error.statusCode;
              response.status = status;
              response.error = error;
            }
            if (parentCustomer) {
              parentCustomer.payback += referral_bonus;
              parentCustomer.save({}, function(error, updatedInstance) {
                if (error) {
                  status = error.statusCode;
                  response.status = status;
                  response.error = error;
                }
                if (updatedInstance) {
                  response.status = status;
                  response.data = customer;
                }
                callback(error, response);
              });
            } else {
              customer.referral_id = null;
              customer.save({}, function(error, updatedInstance){
                if (error) {
                  status = error.statusCode;
                  response.status = status;
                  response.error = error;
                }
                if (updatedInstance) {
                  response.status = status;
                  response.message = "Customer added, but the referral id is invalid.";
                  response.data = customer;
                }
                callback(error, response);
              });
            }
          });
        } else {
          response.status = status;
          response.data = customer;
          callback(error, response);
        }
      } else if (!created) {
        error = new Error();
        error.name = "Bad Request."
        error.status = 400;
        error.message = "Email already exists.";
        response.status = error.status;
        response.error = error;
        callback(error, response);
      }
    });
  };

  /**
   * Gets customer by id
   * @param {number} customer_id ID of the customer
   * @param {Function(Error, object)} callback
   */

  Customer.getCustomerById = function(customer_id, callback) {
    var status = 200,
        response = {};

    Customer.findById(customer_id, function(error,customer){
      if(error){
        status = error.statusCode;
        response.status = status;
        response.error = error;
      }
      if(customer){
        response.status = status;
        customer.referral_count = customer.payback/referral_bonus;
        response.data = customer;
      }
      callback(error, response);
    });
  };

  /**
   * Add children customers referred by a parent customer.
   * @param {array} childrenIds IDs of the children customers.
   * @param {string} customer_id ID of the parent customer
   * @param {Function(Error, object)} callback
   */

  Customer.addReferral = function(childrenIds, customer_id, callback) {
    var status=200,
        response = {},
        earned_bonus = 0;
    Customer.updateAll({customer_id:{inq:childrenIds}, referral_id:null}, {referral_id:customer_id}, function(error,info){
      if(error){
        status = error.statusCode;
        response.status = status;
        response.error = error;
      }
      if(info && info.count>0){
        response.status = status;
        response.info = info;
        earned_bonus = info.count * referral_bonus;
        Customer.findById(customer_id, function(error, customer){
          if(error){
            status = error.statusCode;
            response.status = status;
            response.error = error;
          }
          if(customer){
            customer.payback +=earned_bonus;
            customer.save({}, function(error, updatedInstance){
              if(error){
                status = error.statusCode;
                response.status = status;
                response.error = error;
              }
              if(updatedInstance){
                response.status = status;
                response.data = updatedInstance;
              }
            });
          }
        });
      } else {
        error = new Error();
        error.name = "Bad Request."
        error.status = 400;
        error.message = "Customers already referred.";
        response.status = error.status;
        response.error = error;
      }
      callback(error, response);
    });
  };
  /**
   * Fetch all children customers for a given parent customer ID
   * @param {string} customer_id ID of the parent customer
   * @param {Function(Error, object)} callback
   */

  Customer.fetchAllChildren = function(customer_id, callback) {
    var status = 200,
        response = {};
    Customer.find({where:{referral_id:customer_id}}, function(error, childrenCustomers){
      if(error){
        status = error.statusCode;
        response.status = status;
        response.error = error;
      }
      if(childrenCustomers){
        response.status = status;
        response.data = childrenCustomers;
      }
      callback(error, response);
    });
  };

  /**
   * Fetch all customers with the number ofchildrens referred by them in ascending or descending order
   * @param {number} sortFlag Flag for sorting, 1 for ascending and -1 for descending.
   * @param {Function(Error, object)} callback
   */

  Customer.fetchAllCustomersWithReferralCount = function(sortFlag, callback) {
    var status = 200,
        response = {},
        orderBy = "payback ";

    orderBy += sortFlag===1?"ASC":"DESC";
    Customer.find({order:orderBy}, function(error, customers){
      if(error){
        status = error.statusCode;
        response.status = status;
        response.error = error;
      }
      if(customers){
        response.status = 200;
        for(var i=0, cLength=customers.length;i<cLength;i++){
          customers[i]['referral_count'] = customers[i]['payback']/referral_bonus;
        }
        response.data = customers;
      }
      callback(error, response);
    });
  };

  /**
   * Fetches customers who have not been referred by anone till now
   * @param {number} customerId ID of the customer requesting this list
   * @param {Function(Error, object)} callback
   */

  Customer.fetchUnreferredCustomers = function(customer_id, callback) {
    var status = 200,
        response = {};
    Customer.find({where:{referral_id:null, customer_id:{neq:customer_id}}}, function(error, customers){
      if(error){
        status = error.statusCode;
        response.status = status;
        response.error = error;
      }
      if(customers){
        response.status = status;
        response.data = customers;
      }
      callback(error, response);
    });
  };
};
