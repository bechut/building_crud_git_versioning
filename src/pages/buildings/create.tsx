import React, { FC, memo } from "react";
import { Modal, Form, Input, Row, Col, Space, Button, message } from "antd";
import { apiNames } from "../../redux/metadata";
import { ReduxDispatchHelper } from "../../redux/helper";
import { RootState } from "../../redux";

interface ICreateBuildingPayload {
  code: string;
  name: string;
  locations: string[];
}

interface ICreateBuilding {
  reduxStates: RootState;
  visible: boolean;
  setVisible: Function;
}

const CreateBuilding: FC<ICreateBuilding> = ({
  reduxStates,
  visible,
  setVisible,
}) => {
  const [form] = Form.useForm();

  const handleCreateBuildings = (data: ICreateBuildingPayload) => {
    new ReduxDispatchHelper<any>(
      apiNames.buildings.create,
      data,
      (payload: any) => {
        message.success(payload.message);
        onCancel();
        // handleFetchBuildings();
      },
      (errors: any) => {
        message.error(errors.message);
      }
    ).do();
  };

  const onFinish = (values: ICreateBuildingPayload) => {
    handleCreateBuildings({ ...values, locations: [] });
  };

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Add Building"
      open={visible}
      footer={null}
      confirmLoading={reduxStates?.[apiNames.buildings.create]?.loading}
      closable={false}
    >
      <Form onFinish={onFinish} form={form} labelCol={{ span: 24 }}>
        <Form.Item rules={[{ required: true }]} name={"name"} label="Name">
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }, { max: 10 }]}
          name={"code"}
          label="Code"
        >
          <Input />
        </Form.Item>
        <Row justify={"space-between"}>
          <Col />
          <Col>
            <Space>
              <Button onClick={onCancel}>Cancel</Button>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(CreateBuilding);
