const pool = require("../database/")

/* ***************************
 *  Get all classification data For Final project
 * ************************** */
async function getCategory(){
    return await pool.query("SELECT * FROM public.category ORDER BY category_name")
}

async function getTypeByCategoryId(category_id){
    try{
    const data =  await pool.query(
    `SELECT * FROM public.type AS t
    JOIN public.category AS c
    ON c.category_id = t.category_id
    WHERE c.category_id = $1`,
    [category_id]
    )
    return data.rows
    }catch (error) {
    console.log("getCategory error" + error)    
    }
}

async function getProductByTypeId(type_id){
    try{
    const data =  await pool.query(
    `SELECT * FROM public.product AS p
    JOIN public.type AS t
    ON p.type_id = t.type_id
    WHERE t.type_id = $1`,
    [type_id]
    )
    return data.rows
    }catch (error) {
    console.log("getProduct error" + error)    
    }
}


async function getProductByProductId(product_id){
    try{
      const data = await pool.query(
      `SELECT * FROM public.product
       WHERE product_id = $1`, [product_id]
      )
      return data.rows 
    }catch (error){
      console.error("displayProductDetailsByproductId" + error)
    }
  }

module.exports = {getCategory, getTypeByCategoryId, getProductByTypeId, getProductByProductId}
  