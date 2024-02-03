import React, { useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate();

  const productId = id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cartItems", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={7} className="mb-4">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      className="product-link"
                    >
                      {item.name}
                    </Link>
                  </Col>

                  <Col md={2} className="quantity-col">
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                      className="custom-select" // Add Bootstrap's custom-select class
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4} className="mt-5">
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  Total Items:{" "}
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </Col>
              </Row>
              <Row>
                <Col>
                  Subtotal: ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn btn-dark btn-block rounded-0" // Add Bootstrap's btn-dark, btn-block, and rounded-0 classes
                style={{ width: "100%", borderRadius: "0" }} // Inline styles to set width to 100% and remove border-radius
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
