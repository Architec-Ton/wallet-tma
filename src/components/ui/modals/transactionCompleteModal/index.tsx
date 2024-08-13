import React from "react";

import Column from "components/containers/Column";
import Section from "components/containers/Section";
import Block from "components/typography/Block";

import Modal from "../../modal";
import "./index.css";

type TransactionCompleteModalProps = {
  onClose: () => void;
  thumb: string;
  children: React.ReactNode;
  title: string;
};

const TransactionCompleteModal = ({ onClose, thumb, title, children }: TransactionCompleteModalProps) => (
  <Modal onClose={onClose}>
    <Column className="complete-modal__content">
      <Block className="circle-block">
        <img src={thumb} alt="" />
      </Block>
      <Section title={title} className="complete-container">
        {children}
      </Section>
    </Column>
  </Modal>
);

export default TransactionCompleteModal;
