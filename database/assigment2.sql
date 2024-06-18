-- Q1
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
	VALUES('Tony', 'Stark', 'tonny@starkent.com', 'Iam1ronM@n')

-- Q2
UPDATE public.account 
SET account_type = 'Admin';

-- Q3
DELETE FROM public.account
WHERE account_id = 1;

-- Q4
UPDATE public.inventory
	SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM';

-- Q5
SELECT inv_make, inv_model, classification_name
FROM inventory i
	JOIN classification c
		ON i.classification_id = c.classification_id
WHERE classification_name = 'Sport';

-- Q6
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, 's/', 's/vehicles/'), 
	inv_thumbnail= REPLACE(inv_thumbnail, 's/', 's/vehicles/');


